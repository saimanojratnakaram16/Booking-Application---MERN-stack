import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";
import hotel from "../models/hotel";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("type").notEmpty().withMessage("Hotel Type is Required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is Required and must be a valid number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //upload the images to cloudinary
      const imageUrls = await uploadImages(imageFiles);

      // if upload was successful, add the urls to the new hotel

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //save the new hotel to our DB
      const hotel = new Hotel(newHotel);
      await hotel.save();
      // return a 201 status code
      res.status(201).send(hotel);
    } catch (e) {
      console.log("Error creating hotel: " + e);
      res.status(500).json({ message: "Error creating hotel" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotelData = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotelData);
  } catch (err) {
    res.status(500).json({ message: "Error detching hotel details" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if(!hotel){
        return res.status(404).json({ message: "Hotel Not Found"})
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [...updatedImageUrls,...(updatedHotel.imageUrls || [])];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (err) {
      res.status(500).json({ message: "Failed to update data" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (imageFile) => {
    const b64 = Buffer.from(imageFile.buffer).toString("base64");
    let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;


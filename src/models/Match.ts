import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import slugify from "slugify";
import { getGeocoder } from "../utils/geocoder.js";

export interface IMatchLocation {
  type?: "Point";
  coordinates?: number[];
  formattedAddress?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

export interface IMatch {
  name: string;
  slug?: string;
  description: string;
  website?: string;
  address?: string;
  location?: IMatchLocation;
  averageRating?: number;
  image: string;
  createdAt: Date;
}

export type MatchDocument = HydratedDocument<IMatch>;

const MatchSchema = new Schema<IMatch>({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 50 characters"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating can not be over 10"],
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MatchSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

MatchSchema.pre("save", async function () {
  const loc = await getGeocoder().geocode(this.address as string);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude as number, loc[0].latitude as number],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  this.address = undefined;
});

export const Match: Model<IMatch> = mongoose.model<IMatch>("Match", MatchSchema);

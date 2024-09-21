import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    unique: true,
  },
  serviceLink: {
    type: String,
    default: "",
  },
  serviceKeywords: {
    type: [String],
    default: "",
  },
});

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  imageIPFSHash: { type: String },
  tags: { type: [String] },
  walletId: { type: String, required: true, unique: true },
  services: { type: [ServiceSchema] },
});

const Company = mongoose.models.Company || mongoose.model("Company", CompanySchema);
export default Company;

import Partner from "../Models/ChannelPartner.js";

export const createPartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPartners = async (req, res) => {
  try {
    const Partners = await Partner.find();
    res.status(200).json(Partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPartnerById = async (req, res) => {
  try {
    const Partners = await Partner.findById(req.params.id);
    if (!Partners) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(Partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json({ message: 'Partner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

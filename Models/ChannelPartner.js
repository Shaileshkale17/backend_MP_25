import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  channelPartnerName: String,
  channelPartnerCompanyName: String,
  customerName: String,
  customerMobileLastFour: String,
  projectName:String,
  projectLocation : String,

});

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;

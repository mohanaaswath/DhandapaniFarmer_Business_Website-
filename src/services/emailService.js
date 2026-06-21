import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default';
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE || 'template_contact';
const EMAILJS_INQUIRY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_INQUIRY_TEMPLATE || 'template_inquiry';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_name: 'AgriBusiness Marketplace',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams
    );

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: error.message };
  }
};

export const sendInquiryEmail = async (inquiryData) => {
  try {
    const templateParams = {
      from_name: inquiryData.name,
      from_email: inquiryData.email,
      phone: inquiryData.phone,
      inquiry_type: inquiryData.type,
      item_name: inquiryData.itemName,
      item_id: inquiryData.itemId,
      message: inquiryData.message,
      budget: inquiryData.budget || 'Not specified',
      to_name: 'AgriBusiness Marketplace',
      reply_to: inquiryData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_INQUIRY_TEMPLATE_ID,
      templateParams
    );

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending inquiry email:', error);
    return { success: false, error: error.message };
  }
};

export const sendOrderConfirmation = async (orderData) => {
  try {
    const templateParams = {
      from_name: 'AgriBusiness Marketplace',
      to_name: orderData.customerName,
      to_email: orderData.customerEmail,
      order_id: orderData.orderId,
      order_total: orderData.total,
      order_items: orderData.items.map((item) => item.name).join(', '),
      delivery_address: orderData.address,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_order',
      templateParams
    );

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    return { success: false, error: error.message };
  }
};

export default {
  initEmailJS,
  sendContactEmail,
  sendInquiryEmail,
  sendOrderConfirmation,
};

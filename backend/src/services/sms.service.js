// import axios from "axios";

// export const sendSMS = async ({ phone, message, templateId }) => {
//   try {
//     const response = await axios.get(process.env.SMS_BASE_URL, {
//       params: {
//         user: process.env.SMS_USER,
//         authkey: process.env.SMS_AUTH_KEY,
//         sender: process.env.SMS_SENDER_ID,
//         mobile: phone,
//         text: message,
//         templateid: templateId,
//         rpt: 1,
//       },
//     });
//     console.log(response.data);
//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     console.log(error);
//     // console.error("SMS Error:", error?.response?.data || error.message);

//     return {
//       success: false,
//       error: error?.response?.data || error.message,
//     };
//   }
// };

import axios from "axios";

export const sendSMS = async ({ phone, message, templateId }) => {
  try {
    /*
     * Normalize phone
     */
    const mobile = String(phone || "")
      .replace(/\D/g, "")
      .trim();

    /*
     * Validate required values BEFORE API call
     */
    if (!mobile) {
      throw new Error("SMS mobile number is missing.");
    }

    if (!message) {
      throw new Error("SMS message is missing.");
    }

    if (!templateId) {
      throw new Error("SMS template ID is missing.");
    }

    const params = {
      user: process.env.SMS_USER,
      authkey: process.env.SMS_AUTH_KEY,
      sender: process.env.SMS_SENDER_ID,
      mobile,
      text: message,
      templateid: templateId,
      rpt: 1,
    };

    console.log("SMS Request:", {
      ...params,
      authkey: "***HIDDEN***",
    });

    const response = await axios.get(process.env.SMS_BASE_URL, {
      params,
      timeout: 10000,
    });

    console.log("SMS Response:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "SMS Error:",
      error?.response?.data || error?.message || error,
    );

    return {
      success: false,
      error: error?.response?.data || error?.message || "SMS sending failed",
    };
  }
};

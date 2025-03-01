// interface DeviceInfo {
//   userAgent: string;
//   platform: string;
//   vendor: string;
//   screenResolution: string;
//   language: string;
//   browserName: string;
//   browserVersion: string;
// }

// export const getDeviceInfo = (): DeviceInfo => {
//   const ua = navigator.userAgent;
//   const platform = navigator.platform;
//   const vendor = navigator.vendor;
//   const language = navigator.language;
  
//   // Extract browser name and version
//   const browserMatch = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
//   const browserName = browserMatch[1] || "";
//   const browserVersion = browserMatch[2] || "";
  
//   return {
//     userAgent: ua,
//     platform,
//     vendor,
//     screenResolution: `${window.screen.width}x${window.screen.height}`,
//     language,
//     browserName,
//     browserVersion
//   };
// };

// export const getLocationInfo = async () => {
//   try {
//     const response = await fetch('https://ipapi.co/json/');
//     const data = await response.json();  
//     console.log(data.city);
//     if (data.city==NULL && data.region==NULL)
//     {
// data.city='Error'
// data.region='Error' 
//     }
      
//     else {  return `${data.city}, ${data.region}`;}
  
   
//   } catch (error) {
//     console.error('Error fetching location:', error);
//     return null;
//   }
// };







interface DeviceInfo {
  userAgent: string;
  platform: string;
  vendor: string;
  screenResolution: string;
  language: string;
  browserName: string;
  browserVersion: string;
}

export const getDeviceInfo = (): DeviceInfo => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor;
  const language = navigator.language;
  
  // Extract browser name and version
  const browserMatch = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  const browserName = browserMatch[1] || "Unknown";
  const browserVersion = browserMatch[2] || "Unknown";
  
  return {
    userAgent: ua,
    platform,
    vendor,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language,
    browserName,
    browserVersion
  };
};

export const getLocationInfo = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipwhois.app/json/'); // Alternative API with CORS support
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure city and region exist before returning
    if (!data.city || !data.region) {
      return "Error, Error";
    }
    
    return `${data.city}, ${data.region}`;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "Error, Error"; // Return a consistent error message
  }
};

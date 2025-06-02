import  Vapi from '@vapi-ai/web';

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

// /lib/vapi.sdk.js
// import Vapi from '@vapi-ai/web';

// const vapi = new Vapi(import.meta.env.NEXT_PUBLIC_VAPI_API_KEY || process.env.NEXT_PUBLIC_VAPI_API_KEY);

// export { vapi };

import { generateUUID } from "@/lib/utils";

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
export const API_ROOT_V2 = process.env.NEXT_PUBLIC_API_ROOT_V2;

const NEXT_PUBLIC_CONNECT_URL = `https://${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL}/auth/realms/airsoft-internal/protocol/openid-connect`;
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
export const redirectUri = `${origin}/login`;
const state = generateUUID();

const API = {
  AUTH: {
    REDIRECT: `${NEXT_PUBLIC_CONNECT_URL}/auth?client_id=${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=openid&state=${state}`,
    LOGIN: `${API_ROOT}/auth/login-by-code`,
    REFRESH_TOKEN: `${API_ROOT}/auth/refresh-token`,
    LOGOUT: `${NEXT_PUBLIC_CONNECT_URL}/logout?post_logout_redirect_uri=${redirectUri}&client_id=${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID}`,
  },
  SYSTEM: {
    SETTLE_BANKS: `${API_ROOT}/systems/settle-banks`,
    PROVINCES: `${API_ROOT}/systems/provinces`,
    DISTRICT: `${API_ROOT}/systems/provinces`,
    COMMUNE: `${API_ROOT}/systems/districts`,
    ROLES: `${API_ROOT}/systems/roles`,
    PAYMENT_ACCEPT_METHOD: `${API_ROOT}/systems/payment-accept-statuses`,
  },
  SYSTEM_V2: {
    ADMINISTRATIVE_DIVISION: {
      PROVINCES: `${API_ROOT_V2}/systems/admin-divs/provinces`,
    },
    BANK: `${API_ROOT_V2}/systems/banks`,
  },
  MASTER_MERCHANT: {
    LIST: `${API_ROOT}/master-merchants`,
    CONFIGS: `${API_ROOT}/master-merchants/configs`,
  },
  COMMON: {
    STATUS: `${API_ROOT}/commons/merchant-statuses`,
    PROVINCE: `${API_ROOT}/commons/provinces`,
    COMMUNES: `${API_ROOT}/commons/districts`,
    SETTLE_BANK: `${API_ROOT}/commons/settle-banks`,
    MASTER_MERCHANT: `${API_ROOT}/merchant-personals/configs`,
  },
  MERCHANT_PERSONAL: {
    LIST: `${API_ROOT}/merchant-personals`,
  },
  MERCHANT_CORPORATE: {
    LIST: `${API_ROOT}/merchant-corporates`,
  },
};

export default API;

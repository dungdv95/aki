import API from "@/configs/API";
import { customFetch } from "@/lib/customFetch";

async function getCommonProvinces() {
  const response = await customFetch(`${API.COMMON.PROVINCE}`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.status !== 200) {
    if (response.status === 401) {
      throw {
        code: response.status.toString(),
        message: "Phiên đăng nhập hết hạn",
      };
    }
    throw { code: "error", message: data.message ?? "Có lỗi xảy ra" };
  }
  return data?.data;
}

async function getCommonDistrict(id: string) {
  if (!id) {
    return [];
  }
  const response = await customFetch(`${API.COMMON.PROVINCE}/${id}/districts`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.status !== 200) {
    if (response.status === 401) {
      throw {
        code: response.status.toString(),
        message: "Phiên đăng nhập hết hạn",
      };
    }
    throw { code: "error", message: data.message ?? "Có lỗi xảy ra" };
  }
  return data?.data;
}

async function getCommonCommunes(id: string) {
  if (!id) {
    return [];
  }
  const response = await customFetch(`${API.COMMON.COMMUNES}/${id}/communes`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.status !== 200) {
    if (response.status === 401) {
      throw {
        code: response.status.toString(),
        message: "Phiên đăng nhập hết hạn",
      };
    }
    throw { code: "error", message: data.message ?? "Có lỗi xảy ra" };
  }
  return data?.data;
}

async function getCommonSettleBank() {
  const response = await customFetch(`${API.COMMON.SETTLE_BANK}`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.status !== 200) {
    if (response.status === 401) {
      throw {
        code: response.status.toString(),
        message: "Phiên đăng nhập hết hạn",
      };
    }
    throw { code: "error", message: data.message ?? "Có lỗi xảy ra" };
  }
  return data?.data;
}

async function getCommonMasterMerchant() {
  const response = await customFetch(`${API.COMMON.MASTER_MERCHANT}`, {
    method: "GET",
  });

  const data = await response.json();

  if (response.status !== 200) {
    if (response.status === 401) {
      throw {
        code: response.status.toString(),
        message: "Phiên đăng nhập hết hạn",
      };
    }
    throw { code: "error", message: data.message ?? "Có lỗi xảy ra" };
  }
  return data?.data;
}

export default Object.freeze({
  getCommonProvinces,
  getCommonDistrict,
  getCommonCommunes,
  getCommonSettleBank,
  getCommonMasterMerchant,
});

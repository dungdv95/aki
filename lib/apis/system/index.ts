import API from "@/configs/API";
import { customFetch } from "@/lib/customFetch";

async function getSettleBanks(
  pageIndex: number,
  pageSize: number,
  name: string
) {
  const response = await customFetch(
    `${API.SYSTEM.SETTLE_BANKS}?page=${pageIndex}&limit=${pageSize}&name=${name}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getProvinces(pageIndex: number, pageSize: number, name: string) {
  const response = await customFetch(
    `${API.SYSTEM.PROVINCES}?page=${pageIndex}&pageSize=${pageSize}&name=${name}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getDistricts(
  pageIndex: number,
  pageSize: number,
  name: string,
  code: string
) {
  const response = await customFetch(
    `${API.SYSTEM.DISTRICT}/${code}/districts?page=${pageIndex}&pageSize=${pageSize}&name=${name}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getCommunes(
  pageIndex: number,
  pageSize: number,
  name: string,
  code: string
) {
  const response = await customFetch(
    `${API.SYSTEM.COMMUNE}/${code}/communes?page=${pageIndex}&pageSize=${pageSize}&name=${name}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getRoles(pageIndex: number, pageSize: number) {
  const response = await customFetch(
    `${API.SYSTEM.ROLES}?page=${pageIndex}&limit=${pageSize}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getListMasterMerchant(
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MASTER_MERCHANT.LIST}?page=${pageIndex}&limit=${pageSize}&mmCode=${mmCode}&name=${name}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getUnuseCode() {
  const response = await customFetch(`${API.MASTER_MERCHANT.CONFIGS}`, {
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

async function getMerchantStatus() {
  const response = await customFetch(`${API.COMMON.STATUS}`, {
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

async function createMasterMerchant({
  code,
  status,
  name,
  viewMerchantPayment,
  password,
  owner,
  phoneNumber,
  email,
}: {
  code: string;
  status: string;
  name: string;
  viewMerchantPayment: string;
  password: string;
  owner: string;
  phoneNumber: string;
  email: string;
}) {
  const response = await customFetch(`${API.MASTER_MERCHANT.LIST}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      status,
      name,
      viewMerchantPayment,
      password,
      owner,
      phoneNumber,
      email,
    }),
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
  return data;
}

async function createSettleBank({
  bankId,
  bankShortName,
}: {
  bankId: string;
  bankShortName: string;
}) {
  const response = await customFetch(`${API.SYSTEM.SETTLE_BANKS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bankId,
      bankShortName,
    }),
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
  return data;
}

async function deleteSettleBank({ id }: { id: number }) {
  const response = await customFetch(`${API.SYSTEM.SETTLE_BANKS}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
  return data;
}

async function editSettleBank({
  id,
  bankId,
  bankShortName,
}: {
  id?: number;
  bankId: string;
  bankShortName: string;
}) {
  const response = await customFetch(`${API.SYSTEM.SETTLE_BANKS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bankId,
      bankShortName,
    }),
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
  return data;
}

async function getPaymentAcceptMethod(pageIndex: number, pageSize: number) {
  const response = await customFetch(
    `${API.SYSTEM.PAYMENT_ACCEPT_METHOD}?page=${pageIndex}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getAdDivisionProvinces(pageIndex: number, pageSize: number) {
  const response = await customFetch(
    `${API.SYSTEM_V2.ADMINISTRATIVE_DIVISION.PROVINCES}?page=${pageIndex}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getAdDivisionDistricts(
  pageIndex: number,
  pageSize: number,
  code: string
) {
  const response = await customFetch(
    `${API.SYSTEM_V2.ADMINISTRATIVE_DIVISION.PROVINCES}/${code}/districts`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getAdDivisionCommunes(
  pageIndex: number,
  pageSize: number,
  dist: string,
  code: string
) {
  const response = await customFetch(
    `${API.SYSTEM_V2.ADMINISTRATIVE_DIVISION.PROVINCES}/${dist}/districts/${code}/local-units`,
    {
      method: "GET",
    }
  );

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
  return data;
}

async function getSystemV2Bank(
  pageIndex: number,
  pageSize: number,
  bankName: string,
  bankShortName: string,
  bankCode: string
) {
  const response = await customFetch(
    `${API.SYSTEM_V2.BANK}?page=${pageIndex}&pageSize=${pageSize}&bankName=${bankName}&bankShortName=${bankShortName}&bankCode=${bankCode}`,
    {
      method: "GET",
    }
  );

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
  return data;
}

export default Object.freeze({
  getSettleBanks,
  getProvinces,
  getDistricts,
  getCommunes,
  getRoles,
  getListMasterMerchant,
  getUnuseCode,
  getMerchantStatus,
  createMasterMerchant,
  createSettleBank,
  deleteSettleBank,
  editSettleBank,
  getPaymentAcceptMethod,
  getAdDivisionProvinces,
  getAdDivisionDistricts,
  getAdDivisionCommunes,
  getSystemV2Bank,
});

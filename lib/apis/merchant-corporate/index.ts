import API from "@/configs/API";
import { customFetch } from "@/lib/customFetch";

async function getListMerchantCorporate(
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_CORPORATE.LIST}?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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

async function createMerchantCorporate({
  name,
  dkkd,
  creditorAccount,
  taxNumber,
  phoneNumber,
  addressLine,
  communeCode,
  settleBankId,
  masterMerchantId,
}: {
  name: string;
  dkkd: string;
  creditorAccount: string;
  taxNumber: string;
  phoneNumber: string;
  addressLine: string;
  communeCode: string;
  settleBankId: string;
  masterMerchantId: number;
}) {
  const response = await customFetch(`${API.MERCHANT_CORPORATE.LIST}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      dkkd,
      creditorAccount,
      taxNumber,
      phoneNumber,
      addressLine,
      communeCode,
      settleBankId,
      masterMerchantId,
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

async function editMerchantCorporate({
  id,
  name,
  dkkd,
  creditorAccount,
  taxNumber,
  phoneNumber,
  addressLine,
  communeCode,
  settleBankId,
  masterMerchantId,
}: {
  id?: number;
  name: string;
  dkkd: string;
  creditorAccount: string;
  taxNumber: string;
  phoneNumber: string;
  addressLine: string;
  communeCode: string;
  settleBankId: string;
  masterMerchantId: number;
}) {
  const response = await customFetch(`${API.MERCHANT_CORPORATE.LIST}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      dkkd,
      creditorAccount,
      taxNumber,
      phoneNumber,
      addressLine,
      communeCode,
      settleBankId,
      masterMerchantId,
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

async function getMerchantCorporateBranch(
  merchantId: string,
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_CORPORATE.LIST}/${merchantId}/branches?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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

async function createMerchantBranch({
  merchantId,
  name,
}: {
  merchantId: string;
  name: string;
}) {
  const response = await customFetch(
    `${API.MERCHANT_CORPORATE.LIST}/${merchantId}/branches`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
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

async function getMerchantCorporateCashier(
  merchantId: string,
  branchId: string,
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_CORPORATE.LIST}/${merchantId}/branches/${branchId}/cashiers?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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
  return data?.data;
}

async function createMerchantCashier({
  merchantId,
  branchId,
  name,
}: {
  merchantId: string;
  branchId: string;
  name: string;
}) {
  const response = await customFetch(
    `${API.MERCHANT_CORPORATE.LIST}/${merchantId}/branches/${branchId}/cashiers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
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
  getListMerchantCorporate,
  createMerchantCorporate,
  editMerchantCorporate,
  getMerchantCorporateBranch,
  createMerchantBranch,
  getMerchantCorporateCashier,
  createMerchantCashier,
});

import API from "@/configs/API";
import { customFetch } from "@/lib/customFetch";

async function getListMerchantPersonal(
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_PERSONAL.LIST}?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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

async function createMerchantPersonal({
  name,
  emailAddress,
  creditorAccount,
  ownerName,
  phoneNumber,
  addressLine,
  communeCode,
  settleBankId,
  masterMerchantId,
}: {
  name: string;
  emailAddress: string;
  creditorAccount: string;
  ownerName: string;
  phoneNumber: string;
  addressLine: string;
  communeCode: string;
  settleBankId: string;
  masterMerchantId: number;
}) {
  const response = await customFetch(`${API.MERCHANT_PERSONAL.LIST}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      emailAddress,
      creditorAccount,
      ownerName,
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

async function editMerchantPersonal({
  id,
  name,
  emailAddress,
  creditorAccount,
  ownerName,
  phoneNumber,
  addressLine,
  communeCode,
  settleBankId,
  masterMerchantId,
}: {
  id?: number;
  name: string;
  emailAddress: string;
  creditorAccount: string;
  ownerName: string;
  phoneNumber: string;
  addressLine: string;
  communeCode: string;
  settleBankId: string;
  masterMerchantId: number;
}) {
  const response = await customFetch(`${API.MERCHANT_PERSONAL.LIST}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      emailAddress,
      creditorAccount,
      ownerName,
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

async function deleteMerchantPersonal({ id }: { id: number }) {
  const response = await customFetch(`${API.MERCHANT_PERSONAL.LIST}/${id}`, {
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

async function getMerchantPersonalBranch(
  merchantId: string,
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_PERSONAL.LIST}/${merchantId}/branches?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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

async function createMerchantBranch({
  merchantId,
  name,
}: {
  merchantId: string;
  name: string;
}) {
  const response = await customFetch(
    `${API.MERCHANT_PERSONAL.LIST}/${merchantId}/branches`,
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

async function getMerchantPersonalCashier(
  merchantId: string,
  branchId: string,
  mmCode: string,
  name: string,
  pageIndex: number,
  pageSize: number
) {
  const response = await customFetch(
    `${API.MERCHANT_PERSONAL.LIST}/${merchantId}/branches/${branchId}/cashiers?page=${pageIndex}&pageSize=${pageSize}&mmCode=${mmCode}&name=${name}`,
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
    `${API.MERCHANT_PERSONAL.LIST}/${merchantId}/branches/${branchId}/cashiers`,
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
  getListMerchantPersonal,
  createMerchantPersonal,
  editMerchantPersonal,
  deleteMerchantPersonal,
  getMerchantPersonalBranch,
  createMerchantBranch,
  getMerchantPersonalCashier,
  createMerchantCashier,
});

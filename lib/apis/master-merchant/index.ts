import API from "@/configs/API";
import { customFetch } from "@/lib/customFetch";

async function deleteMasterMerchant({ id }: { id: number }) {
  const response = await customFetch(`${API.MASTER_MERCHANT.LIST}/${id}`, {
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

export default Object.freeze({ deleteMasterMerchant });

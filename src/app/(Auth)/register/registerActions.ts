"use server";

import { cookies } from "next/headers";
import { RegisterFormType } from "./registerSchemaType";

export async function handleRegister(data: RegisterFormType) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const finalResponse = await response.json();
    console.log(finalResponse);

    if (!response.ok || finalResponse.statusMsg === "fail") {
      const errorMessage =
        finalResponse.message ||
        finalResponse.errors?.msg ||
        "Something went wrong.";

      const cookie = await cookies();
      cookie.set("token", finalResponse.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: true,
      });

      return {
        success: false,
        message: errorMessage,
      };
    } else {
      return {
        success: true,
        message: finalResponse.message,
      };
    }
  } catch (error) {
    console.error("Error fetching register:", error);
    return {
      success: false,
      errors: { msg: "Something went wrong. Please try again later." },
    };
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function PATCH(req) {
  try {
    const {
      p_id,
      product_name,
      product_price,
      discount_percent,
      discount_price,
      product_photo,
      stock,
      t_category_id,
      m_category_id,
      active,
      special,
    } = await req.json();

    if (!p_id) {
      return NextResponse.json({ error: "sh_id is required" }, { status: 400 });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from("tbl_product")
      .select("*")
      .eq("product_id", p_id);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existingData || existingData.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const updateData = {};

    if (firstname) updateData.product_name = product_name;
    if (lastname) updateData.product_price = product_price;
    if (phone) updateData.discount_percent = discount_percent;
    if (landline) updateData.discount_price = discount_price;
    if (state) updateData.product_photo = product_photo;
    if (city) updateData.stock = stock;
    if (zipcode) updateData.t_category_id = t_category_id;
    if (address) updateData.m_category_id = m_category_id;
    if (address) updateData.active = active;
    if (address) updateData.special = special;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ status: 400 });
    }

    const { data, error } = await supabase
      .from("tbl_product")
      .update(updateData)
      .eq("product_id", p_id)
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

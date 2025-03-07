"use client";

import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default function OptionsProduct({ p_id, refreshData }) {
  return (
    <div className="flex flex-row gap-2 justify-end">
      <EditProduct p_id={p_id} refresh={refreshData} />
      <DeleteProduct p_id={p_id} refresh={refreshData} />
    </div>
  );
}

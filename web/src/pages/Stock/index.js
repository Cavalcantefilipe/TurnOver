import React, { useEffect, useState } from "react";
import Listar from "../../components/List";
import api from "../../service";
import { DivView, DivTable } from "./styles";

export default function Stock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <DivView>
        <DivTable>
          <Listar data={products} />
        </DivTable>
      </DivView>
    </>
  );
}

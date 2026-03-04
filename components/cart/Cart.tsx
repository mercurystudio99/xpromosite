import Image from "next/image";
import React from "react";

const Cart = ({
  name,
  qty,
}: // price,
{
  name: string;
  qty: number;
  price: number;
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 border rounded-lg overflow-hidden">
        <Image
          className=" col-span-1"
          src={"/images/cap.png"}
          height={150}
          width={150}
          alt="product image"
        />
        <div className=" col-span-1 grid grid-cols-1  items-center">
          <h1 className=" font-bold text-center">{name}</h1>
          <p className=" text-center font-bold">
            QTY{" "}
            <span className=" border-2 border-black px-3 rounded-full ">
              {qty}
            </span>{" "}
          </p>
        </div>
        <div className=" col-span-1 grid grid-cols-1 items-center">
          <h2>Special Instruction</h2>
          <div className="border blorder-black">
            <p>Logo in the front in one color</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

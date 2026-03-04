import Image from "next/image";

const ourBrands = [
  { icon: `/image/OurBrands/Adidas.svg` },
  { icon: `/image/OurBrands/Bellroy.svg` },
  { icon: `/image/OurBrands/Bic.svg` },
  { icon: `/image/OurBrands/BlueTeesGolf.svg` },
  { icon: `/image/OurBrands/Blunt.svg` },
  { icon: `/image/OurBrands/Callaway.svg` },
  { icon: `/image/OurBrands/Camelbak.svg` },
  { icon: `/image/OurBrands/Coleman2.svg` },
  { icon: `/image/OurBrands/Flexfit.svg` },
  { icon: `/image/OurBrands/Footjoy.svg` },
  { icon: `/image/OurBrands/HellyHansen.svg` },
  { icon: `/image/OurBrands/HexaCustom.svg` },
  { icon: `/image/OurBrands/Moleskine.svg` },
  { icon: "/image/OurBrands/Nike.svg" },
  { icon: "/image/OurBrands/SwissPeak.svg" },
  { icon: `/image/OurBrands/Thule.svg` },
  { icon: `/image/OurBrands/Titleist.svg` },
  { icon: `/image/OurBrands/UnderArmour.svg` },
];

const OurBrands = () => {
  return (
    <div>
      {ourBrands.map((i) => (
        <div key={i.icon}>
          <Image src={i.icon} height={30} width={30} alt="image" />
        </div>
      ))}
    </div>
  );
};

export default OurBrands;

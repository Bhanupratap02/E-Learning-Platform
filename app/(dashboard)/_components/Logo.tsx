/** @format */

import Image from "next/image";
const Logo = () => {
  return (
    <Image
      style={{ borderRadius: "50%" }}
      height={30}
      width={50}
      alt="logo"
      src={"/logo.png"}
    />
  );
};

export default Logo;

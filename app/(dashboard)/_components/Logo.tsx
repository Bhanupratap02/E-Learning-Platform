/** @format */

import Image from "next/image";
const Logo = () => {
  return (
    <Image
      style={{ borderRadius: "50%" }}
      height={50}
      width={60}
      alt="logo"
      src={"/logo.png"}
    />
  );
};

export default Logo;

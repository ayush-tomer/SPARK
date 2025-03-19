import { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";

import manipal from "/events/manipal.jpg";
import nakshatra from "/events/nakshatra.webp";
import acehack from "/events/acehack.jpg";
import hackaccino from "/events/hackaccino.jpg";
import hackvsit from "/events/hackvsit.webp";

const IMGS = [
  manipal,
  nakshatra,
  acehack,
  hackaccino,
  hackvsit,
  acehack,
  hackaccino,
  hackvsit,
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1200 : 2200;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.6;
  const radius = (cylinderWidth / (2 * Math.PI)) * 1.1;


  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(rotation, (val) => `rotate3d(0,1,0,${val}deg)`);

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay]);

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ transform: transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
          className="flex min-h-[200px] cursor-grab items-center justify-center"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[5%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[200px] w-[500px] rounded-lg border-[3px] border-white object-cover sm:h-[150px] sm:w-[400px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;

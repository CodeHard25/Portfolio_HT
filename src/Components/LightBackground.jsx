import { useEffect, useState } from "react";

export const LightBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [sunRays, setSunRays] = useState([]);

  useEffect(() => {
    generateClouds();
    generateSunRays();

    const handleResize = () => {
      generateClouds();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateClouds = () => {
    const numberOfClouds = Math.floor(window.innerWidth / 250);
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: i,
        size: Math.random() * 100 + 100,
        x: Math.random() * 100,
        y: Math.random() * 70,
        opacity: Math.random() * 0.3 + 0.4,
        animationDuration: Math.random() * 60 + 60,
        delay: Math.random() * 30,
      });
    }

    setClouds(newClouds);
  };

  const generateSunRays = () => {
    const numberOfRays = 8;
    const newRays = [];

    for (let i = 0; i < numberOfRays; i++) {
      newRays.push({
        id: i,
        angle: (360 / numberOfRays) * i,
        length: Math.random() * 60 + 80,
        opacity: Math.random() * 0.2 + 0.3,
        animationDuration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
      });
    }

    setSunRays(newRays);
  };

 return (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-sky-100 to-blue-500">
  {/* Sun with Rays */}
  <div className="absolute top-20 left-20 w-32 h-32">
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* Sun Rays */}
      {sunRays.map((ray) => (
        <div
          key={ray.id}
          className="sun-ray"
          style={{
            height: `${ray.length}px`,
            transform: `rotate(${ray.angle}deg) translateY(-50%)`,
            animationDuration: `${ray.animationDuration}s`,
            animationDelay: `${ray.delay}s`,
          }}
        />
      ))}

      {/* Sun */}
      <div className="absolute w-32 h-32 rounded-full bg-yellow-300 z-10 shadow-[0_0_90px_80px_rgba(255,236,100,0.8)]"></div>
    </div>
  </div>

  {/* Clouds */}
  {clouds.map((cloud) => (
    <div
      key={cloud.id}
      className="cloud absolute bg-white rounded-full"
      style={{
        width: `${cloud.size}px`,
        height: `${cloud.size * 0.6}px`,
        left: `${cloud.x}%`,
        top: `${cloud.y}%`,
        opacity: cloud.opacity,
        animation: `float ${cloud.animationDuration}s linear ${cloud.delay}s infinite`,
      }}
    />
  ))}
</div>

)
};
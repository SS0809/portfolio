import Image from "next/image";
export default function Aboutme() {
  return (
    <main>
      
      <div className="p-20 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
      <Image
              src="/avatar.jpg"
              alt="Vercel Logo"
              width={500}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "70px",
              }}
              priority
            />
       <div>
          <p className="p-10 text-base">
            I am a Student Backend developer. A person who has a high passion
            for Server Side Technologies and Cloud Services.
          </p>
          <h1 className="p-10 text-xl"> Technologies I'm Familiar with..</h1>
          <ul className="list-disc pl-20 text-bold" style={{color:"grey"}}>
            <li>NodeJs &amp;&amp; MongoDB &amp;&amp; Redis</li>
            <li>Docker &amp;&amp; Docker Swarm</li>
            <li>AWS &amp;&amp; AZURE [Services]</li>
            <li>Flutter &amp;&amp; Services</li>
            <li>React &amp;&amp; React Native</li>
            <li>PhP &amp;&amp; Bash</li>
          </ul>
        </div>
      </div>
      
    </main>
  );
}

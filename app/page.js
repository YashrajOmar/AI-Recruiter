// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h2>Welcome Everyone!</h2>
//       <Button>GO INSIDE</Button>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Welcome Everyone!</h2>
      <Link href="/auth">
        <Button>GO INSIDE</Button>
      </Link>
    </div>
  );
}
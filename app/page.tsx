// Internal imports
// import Test from "@/components/home/test";
import { ArrowRight } from "lucide-react";
import Table from "./(table)/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start py-12 px-24">
      <div className="flex items-center space-x-4">
        <Link href="/inventory/manage">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Manage</CardDescription>
              <CardTitle className="text-4xl">Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Updated 21h ago.
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-[300px] flex items-center justify-end">
                <ArrowRight />
              </div>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/customers">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Your</CardDescription>
              <CardTitle className="text-4xl">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">147 customers</div>
            </CardContent>
            <CardFooter>
              <div className="w-[300px] flex items-center justify-end">
                <ArrowRight />
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import startCase from "lodash/startCase";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    return { label: startCase(segment), href };
  });

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbSeparator />
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

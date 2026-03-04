import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type previousPage = {
  name: string;
  url: string;
};

type breadcrumbPropsType = {
  currentPage: string;
  previousPages: previousPage[];
};

export function BreadCrumbCustom({
  currentPage,
  previousPages,
}: breadcrumbPropsType) {
  return (
    <div className="bg-newsecondary py-1 px-5 rounded-full">
      <Breadcrumb>
        <BreadcrumbList>
          {previousPages.map((p) => (
            <React.Fragment key={p.name}>
              <BreadcrumbItem className=" uppercase italic">
                <Link
                  className="text-newprimary text-xs font-bold"
                  href={p.url}
                >
                  {p.name}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="uppercase italic text-newprimary text-xs font-bold">
              {currentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

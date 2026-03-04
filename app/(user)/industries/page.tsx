import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import PageWrapper from "@/components/PageWrapper";
import React from "react";

const IndustryPage = () => {
  return (
    <PageWrapper>
      <BreadCrumbCustom
        currentPage={"Brands"}
        previousPages={[{ name: "Home", url: "/" }]}
      />
      {/* <Breadcrumb pageName="Categories" rooteLink="/" rooteName="Home" /> */}
      Industry Page
    </PageWrapper>
  );
};

export default IndustryPage;

import { Card, CardBody } from "@heroui/react";
const Dashboard = () => {
  return (
    <>
      <div className=" flex flex-row items-center ">
        <Card>
          <CardBody>تعداد کاربر</CardBody>
        </Card>
        <Card>
          <CardBody>تعداد محصولات</CardBody>
        </Card>
        <Card>
          <CardBody>مجموع سفارشات</CardBody>
        </Card>
        <Card>
          <CardBody>مجموع بازدید</CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;

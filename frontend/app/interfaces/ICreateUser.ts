import CustomerProps from "../types/customer.type";

interface CreateCustomerProps extends Omit<CustomerProps, "id"> {}

export default CreateCustomerProps;

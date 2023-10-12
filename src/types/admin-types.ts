import { OperationCategory, OperationContent, OperationAction } from "../const/admin-const";

export interface  AdminDataRequestQuery {
    category: OperationCategory;
    content: OperationContent;
    action: OperationAction;
}
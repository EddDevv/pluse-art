export type BinaryItemType = {
    id: number;
    objectName: string;
    parentId: number | null;
    partnerId: number;
    partnerLogin: string;
    partnerImage: string;
    fixedPositions: number;
    position: number;
    _expanded?: boolean;
};

export type StructureItemType = {
    id: number;
    creationDate: string;
    name: string;
    middleName: string;
    positionName: string;
    parentId: number | null;
    login: string;
    email: string;
    isActivated: boolean;
    imageUrl: string;
    _expanded?: boolean;
    isOpen?: boolean;
};

export type PointType = {
    id: number;
    objectName: string;
    parentId: number;
    partnerId: number;
    partnerLogin: string;
    partnerImage: string;
    fixedPositions: number;
    position: number;
};
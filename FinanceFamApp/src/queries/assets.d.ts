export interface Asset {
    assetID: string;
    userID: string;
    name: string;
    initialPurchaseDate: string;
    purchasePrice: number;
    desiredLifeSpan: number;
}
export declare function getAssetsByUserId(userID: string): Promise<Asset[]>;
export declare function createAsset(asset: Asset): Promise<boolean>;

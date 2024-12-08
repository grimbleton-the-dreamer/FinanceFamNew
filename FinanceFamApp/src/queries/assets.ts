// Import the shared pool from the parent directory
import pool from '../server';

// Interface for Asset
export interface Asset {
  assetID: string;
  userID: string;
  name: string;
  initialPurchaseDate: string;
  purchasePrice: number;
  desiredLifeSpan: number;
}

// Function to get assets for a user
export async function getAssetsByUserId(userID: string): Promise<Asset[]> {
  try {
    const query = `SELECT * FROM assets WHERE userID = $1`;
    const result = await pool.query(query, [userID]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching assets by user ID:', err);
    return [];
  }
}

// Function to create a new asset
export async function createAsset(asset: Asset): Promise<boolean> {
  try {
    const query = `
      INSERT INTO assets (assetID, userID, name, initialPurchaseDate, purchasePrice, desiredLifeSpan)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await pool.query(query, [
      asset.assetID,
      asset.userID,
      asset.name,
      asset.initialPurchaseDate,
      asset.purchasePrice,
      asset.desiredLifeSpan,
    ]);
    return true;
  } catch (err) {
    console.error('Error creating asset:', err);
    return false;
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import xyz from "@xyzteams/scapers";
import logger from "@/lib/Types/logger";
import { getApikeyUser } from "@/models/users.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { url, apikey } = req.query as { url?: string, apikey?: string };

        if (!url) return res.status(400).json(logger.Required("URL"));
        if (!apikey) return res.status(400).json(logger.Required("Apikey"));
        const user = await getApikeyUser(apikey);
        if (!user) return res.status(401).json(logger.unauthorized());

        const data = await xyz.Scapers.Download.tiktokdl(url);
        return res.status(200).json(data);

    } catch (error) {
        console.error("Error downloading TikTok video:", error);
        return res.status(500).json({
            creator: "FarzzX- APIs",
            message: "An error occurred while processing the request."
        });
    }
}

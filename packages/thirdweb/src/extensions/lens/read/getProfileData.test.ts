import { describe, expect, it } from "vitest";
import { TEST_CLIENT } from "~test/test-clients.js";
import { getProfileData } from "./getProfileData.js";
import { MAX_UINT256 } from "~test/test-consts.js";

/**
 * For Lens protocol, each profileId is an ERC721 tokenId.
 * So any bigint from 0 to (current max profile id) should return a valid profile + handle
 */

const profileId = 1000n;
const client = TEST_CLIENT;

describe("lens/getProfileData", () => {
  it("should return a profile object or null for valid profileId", async () => {
    const profile = await getProfileData({ profileId, client });

    // Although there is a profile, the data of that profile might still be "null"
    // if user hasn't set up any metadata like avatar, coverPicture, name, bio etc.
    expect(typeof profile).toBe("object");
  });

  it("should return null for invalid profileId", async () => {
    // As of Jul 2024 Lens has about 465k profiles | So trying to get profile of a max-unit256 profileId should return "null"
    // gotta be a very long before this number is reached so we should be safe
    const profile = await getProfileData({ profileId: MAX_UINT256, client });
    expect(profile === null).toBe(true);
  });
});

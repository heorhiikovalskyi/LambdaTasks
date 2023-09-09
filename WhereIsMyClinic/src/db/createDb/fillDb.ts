import { Clinics } from "../schema/clinics.js";
import { db } from "../db.js";
import { parseClinics } from "../../parseData/parseData.js";

export const fillDb = async () => {
  try {
    const clinics = (await parseClinics()).map((e) => ({
      slug: e.slug?.split("/clinic/")[1],
      name: e["Clinic Name"],
      longName: e["Long Name Version"],
      city: e.City,
      suburbSlug: e["link to clinic suburb page"],
      suburbName: e.Suburb,
      fullAddress: e["Full Address"],
      pms: e.PMS,
      metaTitle: e["Meta-title"],
      metaDesc: e["Meta-description"],
      typeform: e["Typeform registration link"],
      website: e.Website,
      email: e.Email,
      phone: e.Phone,
      about: e["About Clinic"],
      postCode: e.Postcode,
      state: e.State,
    }));

    await db.delete(Clinics);

    await db.insert(Clinics).values(clinics);
  } catch (err) {
    console.log(err);
  }
};

fillDb();

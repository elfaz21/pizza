// permissions.js
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const definePermissions = (user) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  // Example permissions based on user role
  if (user.role === "SuperAdmin") {
    can("manage", "all"); // Full access
  } else if (user.role === "Restaurant Manager") {
    can("read", "Order");
    can("create", "Role");
    can("update", "User");
    can("delete", "User");
  } else if (user.role === "Kitchen Manager") {
    can("read", "Order");
    can("create", "Menu");
  }

  return build(); // Build the ability instance
};

export default definePermissions;

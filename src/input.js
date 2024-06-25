import Alpine from "alpinejs";
import { bankBranch } from "./script";
window.Alpine = Alpine;
Alpine.data("bankBranch", bankBranch);
Alpine.start();
export function bankBranch(banksJson, initialBranchDetail) {
    const branchDetail = initialBranchDetail !== "null" ? JSON.parse(initialBranchDetail) : null;
    return {
        banks: JSON.parse(banksJson),
        displayedBankName: branchDetail ? `${branchDetail.bank_code} ${branchDetail.bank_name}` : "",
        filteredBanks: [],
        showDropdown: false,
        selectedBank: branchDetail ? { code: branchDetail.bank_code, name: branchDetail.bank_name } : null,
        displayedBranchName: "",
        filteredBranches: [],
        showBranchDropdown: false,
        selectedBranch: branchDetail ? branchDetail.branch_name.replace(branchDetail.bank_name, "").trim() : "",
        branches: [],
        branchDetails: branchDetail,
        copyButton: "複製代碼",
        copyLinkButton: "複製此頁面連結",
        cleanBranchName: branchDetail ? branchDetail.branch_name.replace(branchDetail.bank_name, "").trim() : "",

        refreshBankList() {
            const keyword = this.displayedBankName.toLowerCase();
            if (keyword == "") {
                this.filteredBanks = this.banks;
            } else {
                this.filteredBanks = this.banks.filter(bank => bank.name.toLowerCase().includes(keyword) || bank.code.includes(keyword));
            }
            this.showDropdown = this.filteredBanks.length > 0;
        },

        showAllBanks() {
            this.filteredBanks = this.banks;
            this.showDropdown = this.filteredBanks.length > 0;
        },

        selectBank(bank) {
            this.displayedBankName = `${bank.code} ${bank.name}`;
            this.selectedBank = bank;
            this.selectedBranch = "";
            this.displayedBranchName = "";
            this.branchDetails = null;
            this.showDropdown = false;
            this.fetchBranches(bank.code);
        },

        hideDropdown() {
            setTimeout(() => {
                this.showDropdown = false;
            }, 0);
        },

        async fetchBranches(bankCode) {
            const response = await fetch(`/api/branches/${bankCode}/`);
            this.branches = await response.json();
            this.filteredBranches = this.branches;
        },

        refreshBranchList() {
            const keyword = this.displayedBranchName.toLowerCase();
            if (keyword == "") {
                this.filteredBranches = this.branches;
            } else {
                this.filteredBranches = this.branches.filter(branch => branch.branch_name.toLowerCase().includes(keyword));
            }
            this.showBranchDropdown = this.filteredBranches.length > 0;
        },

        showAllBranches() {
            this.filteredBranches = this.branches;
            this.showBranchDropdown = this.filteredBranches.length > 0;
        },

        selectBranch(branch) {
            this.displayedBranchName = branch.branch_name.replace(this.selectedBank.name, "").trim();
            this.selectedBranch = branch;
            this.showBranchDropdown = false;
            this.updateBranchDetails();
        },

        hideBranchDropdown() {
            setTimeout(() => {
                this.showBranchDropdown = false;
            }, 0);
        },

        async updateBranchDetails() {
            const branch = this.branches.find(branch => branch.branch_name === this.selectedBranch.branch_name);
            if (branch) {
                const response = await fetch(`/api/branch-detail/${branch.branch_code}/`);
                this.branchDetails = await response.json();
                this.cleanBranchName = this.branchDetails.branch_name.replace(this.branchDetails.bank_name, "").trim();
                const newURL = `${window.location.origin}/${this.branchDetails.bank_code}/${this.branchDetails.branch_code}/${this.branchDetails.bank_name}-${this.cleanBranchName}.html`;
                history.replaceState({}, "", newURL);
            }
        },

        copyCode() {
            navigator.clipboard.writeText(this.branchDetails.branch_code).then(() => {
                this.copyButton = "已複製";
                setTimeout(() => {
                    this.copyButton = "複製代碼";
                }, 2000);
            });
        },

        copyLink() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.copyLinkButton = "已複製";
                setTimeout(() => {
                    this.copyLinkButton = "複製此頁面連結";
                }, 2000);
            });
        }
    };
}

export function bankBranch(banksData) {
    let banks;
    try {
        banks = JSON.parse(banksData);
    } catch (e) {
        console.error("資料錯誤：", e);
        banks = [];
    }

    return {
        banks: banks,
        selectedBank: null,
        showDropdown: false,
        branches: [],
        selectedBranch: "",
        branchDetails: null,
        copyButton: "複製代碼",
        copyLinkButton: "複製此頁面連結",
        get displayedBankName() {
            return this.selectedBank ? `${this.selectedBank.code} ${this.selectedBank.name}` : "";
        },
        set displayedBankName(value) {
            const bank = this.banks.find(bank => `${bank.code} ${bank.name}` === value);
            this.selectedBank = bank || null;
        },
        get filteredBanks() {
            const search = this.displayedBankName.toLowerCase();
            return this.banks.filter(bank =>
                bank.name.toLowerCase().includes(search) || bank.code.startsWith(search)
            );
        },
        selectBank(bank) {
            this.selectedBank = bank;
            this.showDropdown = false;
            this.updateBranches();
        },
        refreshBankList() {
            this.showDropdown = true;
        },
        updateBranches() {
            this.branches = [];
            this.selectedBranch = "";
            this.branchDetails = null;
            if (this.selectedBank) {
                const bankCode = this.selectedBank.code;
                fetch(`/api/branches/${bankCode}/`)
                    .then(response => response.json())
                    .then(data => {
                        this.branches = data;
                    })
                    .catch(error => console.error("取得分行名稱發生錯誤：", error));
            }
        },
        updateBranchDetails() {
            if (!this.selectedBranch) {
                this.branchDetails = null;
                return;
            }
            const branch = this.branches.find(branch => this.selectedBank && branch.branch_name.replace(this.selectedBank.name, '').trim() === this.selectedBranch);
            if (branch) {
                fetch(`/api/branch-detail/${branch.branch_code}/`)
                    .then(response => response.json())
                    .then(data => {
                        this.branchDetails = data;
                    })
                    .catch(error => console.error("取得分行名稱詳細資訊錯誤：", error));
            } else {
                this.branchDetails = null;
            }
        },
        get cleanBranchName() {
            return this.selectedBank && this.branchDetails
                ? this.branchDetails.branch_name.replace(this.selectedBank.name, '').trim()
                : '';
        },
        copyLink() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.copyLinkButton = "已複製";
                setTimeout(() => {
                    this.copyLinkButton = "複製此頁面連結";
                }, 1000);
            }).catch(err => {
                console.error("頁面連結複製失敗: ", err);
            });
        },
        copyCode() {
            if (this.branchDetails && this.branchDetails.branch_code) {
                navigator.clipboard.writeText(this.branchDetails.branch_code).then(() => {
                    this.copyButton = "已複製";
                    setTimeout(() => {
                        this.copyButton = "複製代碼";
                    }, 1000);
                }).catch(error => {
                    console.error("分行代碼複製失敗！！！", error);
                });
            }
        }
    }
}

const itemCtrl = (function(){

    const Item = function(id, description, amount){
        this.id = id;
        this.description= description;
        this.amount = amount;
    }

    const data = {
        items: [],
    }

    return{
        logData: function(){
            return data;
        },
        addMoney: function(description, amount){
            let ID = itemCtrl.createID();
            newMoney = new Item(ID, description, amount);
            data.items.push(newMoney);

            return newMoney
        },
        createID: function(){
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        }
    }
})();


const UICtrl = (function(){

    const UISelectors = {
        incomeBtn: '#add_income',
        expenseBtn: '#add_expense',
        description:'#description',
        amount:'#amount',
        moneyEarned: '#amount_earned',
        moneyAvailable:'#amount_available',
        moneySpent:'#amount_spent',
        incomeList:'#income_container',
        expenseList:'#expenses_container',
        expenseItem: '.expense_amount',
        incomeItem:'.income_amount',
        itemsContainer:'items_container'
    }

    return{
        getSelector: function(){
            return UISelectors
        },
        getDescriptionInput: function(){
            return{
                descriptionInput: document.querySelector(UISelectors.description).value
            }
        },
        getValueInput: function(){
            return{
                amountInput: document.querySelector(UISelectors.amount).value
            }
        },
        addIncomeItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item income'
            div.id = `item-${item.id}`
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item_income">
                <p class="symbol">$</p>
                <span class="income_amount">${item.amount}</span>
            </div>
            <i class="far fa-trash-alt"></i>
            `;

            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend',div);
        },
        clearInputs: function(){
            document.querySelector(UISelectors.description).value='',
            document.querySelector(UISelectors.amount).value='';
        },
        updateEarned: function(){
            const allIncome = document.querySelectorAll(UISelectors.incomeItem);
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b
            },0);
            const earnedTotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2);
        },
        addExpenseItem: function(item){
            const div = document.createElement('div');
            div.classList = 'item expense'
            div.id = `item-${item.id}`
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item_expense">
                <p class="symbol">$</p>
                <span class="expense_amount">${item.amount}</span>
            </div>
            <i class="far fa-trash-alt"></i>
            `;

            document.querySelector(UISelectors.expenseList).insertAdjacentElement('beforeend',div);
        },
        updateSpent: function(){
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem);
            const expenseCount = [...allExpenses].map(item=> +item.innerHTML)
            const expenseSum = expenseCount.reduce(function(a,b){
                return a+b
            },0)

            const expensesTotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum.toFixed(2);
        },
        updateAvailable: function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent)
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML).toFixed(2))
        }
    }
})();

const App = (function(){
    const loadEventListener = function(){
        const UISelectors = UICtrl.getSelector();

        document.querySelector(UISelectors.incomeBtn).addEventListener('click',addIncome);
        document.querySelector(UISelectors.expenseBtn).addEventListener('click',addExpense);
        
    };
    const addIncome = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
           UICtrl.addIncomeItem(newMoney);

           UICtrl.clearInputs()

           UICtrl.updateEarned();
           UICtrl.updateAvailable();


        }
    }
    const addExpense = function(){
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            const newMoney = itemCtrl.addMoney(description.descriptionInput, amount.amountInput);
          UICtrl.addExpenseItem(newMoney);
          UICtrl.clearInputs();
          UICtrl.updateSpent();
          UICtrl.updateAvailable();
        }
    }
  
    

      return{
          init: function(){
              loadEventListener();
          }
      }

})(itemCtrl, UICtrl);

App.init();
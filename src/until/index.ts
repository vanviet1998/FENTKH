import { ICards, LOCAL_STORE_NAME, ICardItem, IAddItemCard, IAddAmountItemCard } from './../constant/index';
import { LANGUAGE_CODE, SUB_FIX_PRCE } from "src/constant"
import { Service } from "typedi"

export const formatPrice = (number: number) => {
   return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRCE.VND }).format(number)
}

export const caculatorPriceSale = (price: number, sale: number) => {
   const result = price - (price * sale / 100)
   return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRCE.VND }).format(result)
}

export const convertToTreeData = (arr) => {
   let arrMap = new Map(arr.map(item => [item.id, item]));
   let tree = [];

   for (let i = 0; i < arr.length; i++) {
      let item = arr[i];

      if (item.parent_id) {
         let parentItem:any = arrMap.get(item.parent_id);

         if (parentItem) {
            if (parentItem?.children || "") {
               parentItem.children.push(item);
            } else {
               parentItem.children = [item];
            }
         }
      } else {
         tree.push(item);
      }
   }

   return tree;
}

@Service()
export class LocalStore {

   private _myLocalStore: Storage = localStorage

   private name: string

   constructor(name: string) {
      this.name = name
   }
   public getAllItems() {
      if (typeof window === "undefined") return null
      const list = []
      for (var i = 0; i < this._myLocalStore.length; i++) {
         var key = this._myLocalStore.key(i);
         var value = this._myLocalStore.getItem(key);

         list.push({
            key: key,
            value: value
         });
      }
      return list
   }

   public getItem() {
      if (typeof window === "undefined") return null

      const item: string = this._myLocalStore.getItem(this.name)
      return item

   }
   public async setItem(item: object): Promise<void> {
      if (typeof window === "undefined") return null

      await this._myLocalStore.setItem(this.name, JSON.stringify(item))
   }
   public async removeItem(item: string): Promise<void> {
      if (typeof window === "undefined") return null

      await this._myLocalStore.removeItem(this.name)
   }
   public async clear(): Promise<void> {
      if (typeof window === "undefined") return null

      await this._myLocalStore.clear()
   }
}

export class CardStore {
   private myStoreCard = new LocalStore(LOCAL_STORE_NAME.cards)
   private allCards = this.myStoreCard.getItem()
   private jsonCard: ICards = JSON.parse(this.allCards)


   private caculatorPriceItem(price: number, sale: number): number {
      const resuilt = price - (price * sale / 100)
      return resuilt
   }
   private caculatorAllAmount(cards: ICards): number {
      const total: number = cards.cards.reduce((acc, curr) => {
         return acc + curr.total
      }, 0
      )
      return total
   }
   private caulatorAllAmountAndTotal(): void {
      this.jsonCard.total = this.caculatorAllAmount(this.jsonCard)
   }
   public addItemsToCard(props: IAddItemCard): void {
      console.log("🚀 ~ file: index.ts ~ line 109 ~ CardStore ~ addItemsToCard ~ props", props)
      const { item, amount } = props
      const itemCard: ICardItem = {
         _id: item._id,
         image: item.image.length ? item.image[0] : "",
         size: item.size,
         guarantee: item.guarantee,
         name: item.name,
         price: item.price,
         disCount: item.disCount,
         realPrice: this.caculatorPriceItem(item.price, item.disCount),
         amount,
         total: this.caculatorPriceItem(item.price, item.disCount) * amount,

         // color:item.color,

      }
      if (!this.allCards) {

         const newCard: ICards = {
            total: itemCard.total,
            cards: [itemCard]
         }
         this.myStoreCard.setItem(newCard)

      }
      else {
         const index = this.jsonCard.cards.findIndex(v => v._id === item._id)
         if (index === -1) {
            this.jsonCard.cards.push(itemCard)
            this.jsonCard.total = this.caculatorAllAmount(this.jsonCard)
            this.myStoreCard.setItem(this.jsonCard)
         } else {
            this.jsonCard.cards[index].amount += amount
            this.jsonCard.cards[index].total += this.caculatorPriceItem(item.price, item.disCount) * this.jsonCard.cards[index].amount
            this.jsonCard.total = this.caculatorAllAmount(this.jsonCard)

            this.myStoreCard.setItem(this.jsonCard)
         }
      }
   }

   public addAmountToItemCards(props: IAddAmountItemCard) {
      const { id, amount } = props
      console.log("🚀 ~ file: index.ts ~ line 156 ~ CardStore ~ addAmountToItemCards ~ amount", amount)
      const index = this.jsonCard.cards.findIndex(v => v._id === id)
      if (index === -1) {
         return
      } else {
         const item = this.jsonCard.cards[index]
         this.jsonCard.cards[index].amount = amount
         this.jsonCard.cards[index].total = this.caculatorPriceItem(item.price, item.disCount) * amount
         this.jsonCard.total = this.caculatorAllAmount(this.jsonCard)
         this.myStoreCard.setItem(this.jsonCard)
      }
   }

   public getCards(): ICards {
      return this.jsonCard
   }
   public removeItemToCard(_id: string): void {
      if (!this.allCards) return
      const newCards = this.jsonCard.cards.filter(v => v._id !== _id)
      if (!newCards) this.myStoreCard.setItem(null)
      this.jsonCard.cards = newCards
      this.jsonCard.total = this.caculatorAllAmount(this.jsonCard)
      this.myStoreCard.setItem(this.jsonCard)
   }
   public removeAllToCard(): void {
      this.myStoreCard.clear()
   }

}


export function makeid(length: number) {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
         charactersLength));
   }
   return result;
}
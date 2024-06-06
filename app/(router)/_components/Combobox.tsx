import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ComboboxDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]  text-white focus:ring-transparent bg-n2dark font-sans ">
        <SelectValue placeholder="المفكرون" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-n2dark  font-sans text-white">
          <SelectLabel className="pb-1 border-b border-slate-500 font-semibold">اختر</SelectLabel>
          <SelectItem className="hover:animate-pulse font-semibold cursor-pointer" value="ali-al-wardi">عبدالوهاب المسيري</SelectItem>
          <SelectItem className="hover:animate-pulse font-semibold cursor-pointer" value="camal-al-hidari">كمال الحيدري</SelectItem>
          <SelectItem className="hover:animate-pulse font-semibold cursor-pointer" value="adnan-ibrahim">عدنان أبراهيم</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

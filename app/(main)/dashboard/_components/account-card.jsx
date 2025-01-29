"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
//import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name,type,balance, id, isDefault } = account;

  return (
    <Card>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <Switch />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Счёт
            </p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
  )
}

export default AccountCard
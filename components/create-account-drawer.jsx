"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";
import React from 'react'

const CreateAccountDrawer = ({children}) => {
  const [open,setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Счёт успешно добавлен");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Не удалось добавить счёт");
    }
  }, [error]);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Добавить Новый Счёт</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Название Счёта
                        </label>
                        <Input 
                            id='name'
                            placeholder='Рабочий'
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">Тип Счёта</label>
                        <Select
                          onValueChange={(value) => setValue("type", value)}
                          defaultValue={watch("type")}
                        >
                          <SelectTrigger id='type'>
                            <SelectValue placeholder="Выберите Тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CURRENT">Регулярный</SelectItem>
                            <SelectItem value="SAVINGS">Сберегательный</SelectItem>
                          </SelectContent>
                        </Select>

                        {errors.type && (
                            <p className="text-sm text-red-500">{errors.type.message}</p>
                        )}
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="balance" className="text-sm font-medium">
                            Начальный Баланс
                        </label>
                        <Input 
                            id="balance"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...register("balance")}
                        />
                        {errors.balance && (
                            <p className="text-sm text-red-500">{errors.balance.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <label
                            htmlFor="isDefault"
                            className="text-sm font-medium cursor-pointer"
                        >
                            Сделать Основным
                        </label>

                        <p className="text-sm text-muted-foreground">
                            Этот счёт будет выбран как основной для транзакций
                        </p>
                      </div>
                        <Switch
                            id='isDefault' 
                            checked={watch("isDefault")}
                            onCheckedChange={(checked) => setValue("isDefault", checked)}
                        />
                    </div>


                    <div className="flex gap-4 pt-4">
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" className="flex-1">
                                Отменить
                            </Button>
                        </DrawerClose>
                        
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={createAccountLoading}
                        >
                            {createAccountLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Добавление...
                              </>
                            ) : (
                              "Добавить Счёт"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </DrawerContent>
    </Drawer>

  );
};

export default CreateAccountDrawer
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/account";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const RECURRING_INTERVALS = {
  DAILY: "Ежедневно",
  WEEKLY: "Еженедельно",
  MONTHLY: "Ежемесячно",
  YEARLY: "Ежегодно",
};

export function NoPaginationTransactionTable({ transactions }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const router = useRouter();

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id)
    );
  };

  const { loading: deleteLoading, fn: deleteFn, data: deleted } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Вы уверены, что хотите удалить ${selectedIds.length} транзакций?`
      )
    )
      return;

    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Транзакции успешно удалены");
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск транзакций..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Все типы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Доход</SelectItem>
              <SelectItem value="EXPENSE">Расход</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Все транзакции" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Повторяющиеся</SelectItem>
              <SelectItem value="non-recurring">Неповторяющиеся</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Удалить выбранные ({selectedIds.length})
              </Button>
            </div>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Очистить фильтры"
            >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4">
              <Checkbox
                checked={selectedIds.length === filteredAndSortedTransactions.length}
                indeterminate={
                  selectedIds.length > 0 && selectedIds.length < filteredAndSortedTransactions.length
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="cursor-pointer"
            >
              Дата
              {sortConfig.field === "date" && (
                <span className="ml-2">
                  {sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}
                </span>
              )}
            </TableHead>
            <TableHead
              onClick={() => handleSort("amount")}
              className="cursor-pointer"
            >
              Сумма
              {sortConfig.field === "amount" && (
                <span className="ml-2">
                  {sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}
                </span>
              )}
            </TableHead>
            <TableHead
              onClick={() => handleSort("category")}
              className="cursor-pointer"
            >
              Категория
              {sortConfig.field === "category" && (
                <span className="ml-2">
                  {sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}
                </span>
              )}
            </TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="w-4">
                <Checkbox
                  checked={selectedIds.includes(transaction.id)}
                  onCheckedChange={() => handleSelect(transaction.id)}
                />
              </TableCell>
              <TableCell>
                {format(new Date(transaction.date), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                {transaction.type === "INCOME" && (
                  <span className="text-green-500">
                    +{transaction.amount} ₽
                  </span>
                )}
                {transaction.type === "EXPENSE" && (
                  <span className="text-red-500">
                    -{transaction.amount} ₽
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize",
                    categoryColors[transaction.category]
                  )}
                >
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSelect(transaction.id)}>
                      Выбрать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Вы уверены, что хотите удалить эту транзакцию?"
                            )
                          ) {
                            deleteFn([transaction.id]);
                          }
                        }}
                      >
                        Удалить
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

{/* Таблица транзакций */}
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={
              selectedIds.length ===
                filteredAndSortedTransactions.length &&
                filteredAndSortedTransactions.length > 0
            }
            onCheckedChange={handleSelectAll}
          />
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("date")}
        >
          <div className="flex items-center">
            Дата
            {sortConfig.field === "date" &&
              (sortConfig.direction === "asc" ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </div>
        </TableHead>
        <TableHead>Описание</TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("category")}
        >
          <div className="flex items-center">
            Категория
            {sortConfig.field === "category" &&
              (sortConfig.direction === "asc" ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer text-right"
          onClick={() => handleSort("amount")}
        >
          <div className="flex items-center justify-end">
            Сумма
            {sortConfig.field === "amount" &&
              (sortConfig.direction === "asc" ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </div>
        </TableHead>
        <TableHead>Повторяющаяся</TableHead>
        <TableHead className="w-[50px]" />
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredAndSortedTransactions.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={7}
            className="text-center text-muted-foreground"
          >
            Совпадений не найдено
          </TableCell>
        </TableRow>
      ) : (
        filteredAndSortedTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(transaction.id)}
                onCheckedChange={() => handleSelect(transaction.id)}
              />
            </TableCell>
            <TableCell>
              {format(new Date(transaction.date), "PP")} {/* Убедитесь, что установлена локаль ru-RU для date-fns */}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="capitalize">
              <span
                style={{
                  background: categoryColors[transaction.category],
                }}
                className="px-2 py-1 rounded text-white text-sm"
              >
                {transaction.category} {/* Категории должны быть локализованы */}
              </span>
            </TableCell>
            <TableCell
              className={cn(
                "text-right font-medium",
                transaction.type === "EXPENSE" ? "text-red-500" : "text-green-500"
              )}
            >
              {transaction.type === "EXPENSE" ? "-" : "+"}$ {/* Убедитесь в правильности валюты */}
              {transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell>
              {transaction.isRecurring ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                      >
                        <RefreshCw className="h-3 w-3" />
                        {RECURRING_INTERVALS[transaction.recurringInterval]} {/* Интервалы должны быть локализованы */}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">Следующая дата:</div>
                        <div>
                          {format(
                            new Date(transaction.nextRecurringDate),
                            "PPP" // Убедитесь в правильной локализации даты
                          )}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Однократная
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/transaction/create?edit=${transaction.id}`
                      )
                    }
                  >
                    Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => deleteFn([transaction.id])}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>
'use client'

import { useState } from 'react'
import { addDays, format } from 'date-fns'
import {
  Download,
  Edit,
  Mail,
  MoreHorizontal,
  Plus,
  Trash,
  Copy,
  CalendarIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Örnek fatura verileri
const invoices = [
  {
    id: '#5036',
    client: 'Andrew Burns',
    email: 'pwillis@cross.org',
    total: '$3171',
    date: '2024-11-19',
    status: 'pending',
    balance: '-$205',
  },
  {
    id: '#5035',
    client: 'Dana Carey',
    email: 'jamesjoel@chapman.net',
    total: '$4263',
    date: '2024-11-20',
    status: 'draft',
    balance: '$762',
  },
  // Daha fazla fatura eklenebilir
]

export default function InvoiceDash() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

  const handleCreateInvoice = () => {
    // Fatura oluşturma modalını aç
    console.log('Create invoice clicked')
  }

  const handleDownloadPDF = (invoiceId: string) => {
    // PDF indirme işlemi
    console.log('Download PDF:', invoiceId)
  }

  const handleSendEmail = (invoiceId: string) => {
    // E-posta gönderme işlemi
    console.log('Send email:', invoiceId)
  }

  const handleEditInvoice = (invoiceId: string) => {
    // Fatura düzenleme
    console.log('Edit invoice:', invoiceId)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    // Fatura silme
    console.log('Delete invoice:', invoiceId)
  }

  const handleDuplicateInvoice = (invoiceId: string) => {
    // Fatura kopyalama
    console.log('Duplicate invoice:', invoiceId)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* İstatistik Kartları */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Toplam müşteri</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165</div>
            <p className="text-xs text-muted-foreground">Toplam fatura</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ödenen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.46k</div>
            <p className="text-xs text-muted-foreground">Ödenen toplam</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ödenmemiş</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$876</div>
            <p className="text-xs text-muted-foreground">Bekleyen ödemeler</p>
          </CardContent>
        </Card>
      </div>

      {/* Kontroller */}
      <div className="flex justify-between items-center">
        <Button onClick={handleCreateInvoice} className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Fatura Oluştur
        </Button>
        <div className="flex gap-4">
          <Input
            placeholder="Fatura Ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Fatura Durumu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="paid">Ödendi</SelectItem>
              <SelectItem value="pending">Beklemede</SelectItem>
              <SelectItem value="draft">Taslak</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} -{' '}
                      {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Tarih Aralığı Seç</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Fatura Tablosu */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>MÜŞTERİ</TableHead>
                <TableHead>TOPLAM</TableHead>
                <TableHead>TARİH</TableHead>
                <TableHead>DURUM</TableHead>
                <TableHead>BAKİYE</TableHead>
                <TableHead className="text-right">İŞLEMLER</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices
                .filter((invoice) => {
                  const matchesSearch =
                    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
                  const matchesDateRange =
                    (!dateRange?.from || new Date(invoice.date) >= dateRange.from) &&
                    (!dateRange?.to || new Date(invoice.date) <= dateRange.to)
                  return matchesSearch && matchesDateRange
                })
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.client}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.total}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === 'paid'
                            ? 'success'
                            : invoice.status === 'pending'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {invoice.status === 'paid'
                          ? 'Ödendi'
                          : invoice.status === 'pending'
                          ? 'Beklemede'
                          : 'Taslak'}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.balance}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadPDF(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSendEmail(invoice.id)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditInvoice(invoice.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicateInvoice(invoice.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Kopyala
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteInvoice(invoice.id)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
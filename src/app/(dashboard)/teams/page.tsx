import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Status = "Completado" | "En progreso" | "Pendiente" | "Bloqueado";

interface Member {
    name: string;
    email: string;
    role: string;
    activity: string;
    status: Status;
}

interface Project {
    name: string;
    members: Member[];
}

const projects: Project[] = [
    {
        name: "Atlas CRM",
        members: [
            {
                name: "María González",
                email: "maria.g@atlas.io",
                role: "Project Manager",
                activity: "Definir roadmap Q3",
                status: "En progreso",
            },
            {
                name: "Carlos Ruiz",
                email: "carlos.r@atlas.io",
                role: "Frontend Lead",
                activity: "Refactor del dashboard",
                status: "Completado",
            },
            {
                name: "Lucía Pérez",
                email: "lucia.p@atlas.io",
                role: "QA Engineer",
                activity: "Pruebas de regresión",
                status: "Pendiente",
            },
        ],
    },
    {
        name: "Orbit Analytics",
        members: [
            {
                name: "Andrés Molina",
                email: "andres.m@orbit.io",
                role: "Data Scientist",
                activity: "Modelo de predicción de churn",
                status: "En progreso",
            },
            {
                name: "Sofía Vargas",
                email: "sofia.v@orbit.io",
                role: "Backend Developer",
                activity: "API de métricas v2",
                status: "Bloqueado",
            },
            {
                name: "Diego Torres",
                email: "diego.t@orbit.io",
                role: "DevOps",
                activity: "Migración a Kubernetes",
                status: "Completado",
            },
        ],
    },
    {
        name: "Nimbus Mobile",
        members: [
            {
                name: "Valentina Cruz",
                email: "vale.c@nimbus.io",
                role: "iOS Developer",
                activity: "Onboarding screens",
                status: "Completado",
            },
            {
                name: "Mateo Herrera",
                email: "mateo.h@nimbus.io",
                role: "Android Developer",
                activity: "Push notifications",
                status: "En progreso",
            },
            {
                name: "Isabela Romero",
                email: "isa.r@nimbus.io",
                role: "Product Designer",
                activity: "Prototipo de checkout",
                status: "Pendiente",
            },
        ],
    },
];

const statusVariant: Record<Status, { className: string }> = {
    Completado: { className: "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20" },
    "En progreso": { className: "bg-blue-500/15 text-blue-600 hover:bg-blue-500/20" },
    Pendiente: { className: "bg-amber-500/15 text-amber-600 hover:bg-amber-500/20" },
    Bloqueado: { className: "bg-red-500/15 text-red-600 hover:bg-red-500/20" },
};

export default function TeamsPage () {
    return (
        <div className="p-6 space-y-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    Equipos organizados por proyecto, con su rol y actividad asignada.
                </p>
            </header>

            <div className="space-y-6">
                {projects.map((project) => (
                    <Card key={project.name}>
                        <CardHeader>
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre de usuario</TableHead>
                                        <TableHead>Correo</TableHead>
                                        <TableHead>Rol</TableHead>
                                        <TableHead>Actividad a realizar</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.members.map((m) => (
                                        <TableRow key={m.email}>
                                            <TableCell className="font-medium">{m.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{m.email}</TableCell>
                                            <TableCell>{m.role}</TableCell>
                                            <TableCell>{m.activity}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={statusVariant[m.status].className}
                                                >
                                                    {m.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

